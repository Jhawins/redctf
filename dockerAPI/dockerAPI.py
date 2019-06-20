import docker as d

class dockerAPI:

    def __init__(self):
        # client
        self.client = d.from_env()

    def version(self):
        """
        :return: version of Docker client running (host set by environment variable)
        :from: https://docker-py.readthedocs.io/en/stable/client.html
        """
        r = self.client.version()

        return r

    def listContainers(self, all=None):
        """
        List running containers on docker host.
        :from: https://docker-py.readthedocs.io/en/stable/containers.html
        :param all: bool, set to true to return all containers
        :return: list of container objects
        """
        r = self.client.containers.list(all)

        return r

    def createNetwork(self, username):
        """
        Create a network based upon username.
        :from: https://docker-py.readthedocs.io/en/stable/networks.html
        :param username: string, username is used for network name
        :return: network object
        """
        # check if network exists
        net = self.checkIfNetworkExists(username)
        if net is False:
            # create network before creating container
            print("network {0} not found, creating {0} network".format(username))
            try:
                r = self.client.networks.create(name=username, driver="overlay", labels={"user": username}, attachable=True)
            except Exception as ex:
                print("createNetwork() {0}".format(ex))
        else:
            print("network {0} already exists".format(username))
            return net

        return r

    def getNetworkObject(self, networkName):
        """
        Get a network object by its name.
        :from: https://docker-py.readthedocs.io/en/stable/networks.html
        :param networkName: string, name of network to return
        :return: network object
        """
        # check if network exists
        net = self.checkIfNetworkExists(networkName)
        if net is False:
            return net
        else:
            try:
                networkObject = self.client.networks.get(networkName)
            except Exception as ex:
                print("getnetworkobject() {0}".format(ex))

            return networkObject

    def connectNetwork(self, networkName, containerName):

        net = self.getNetworkObject(networkName)
        try:
            net.connect(containerName)
            print("network connected")
        except Exception as ex:
            print("connectNetwork() {0}".format(ex))
            return False
        return True

    def createTraefikContainer(self):
        """
        Creates a traefik container used for reverse proxy of users to individual containers. Must create a traefik.toml on the server you are creating this on to expose the API/dashboard.
        :from: https://docker-py.readthedocs.io/en/stable/containers.html
        :return: container object
        """

        # check if network exists
        net = self.checkIfNetworkExists('traefik')
        if net is False:
            # create network before creating container
            print("network traefik not found")
            try:
                self.createNetwork('traefik')
            except Exception as ex:
                print(ex)
        else:
            print("network already exists")

        traefik = self.checkIfContainerExists('traefik')
        if traefik is False:
            print("no traefik container found")

            # create container & run if none exists
            try:
                print("creating traefik container")
                r = self.client.containers.create("traefik:latest", name="traefik",network="traefik", ports={"80/tcp": "80", "9090/tcp": "9090"}, volumes={"/var/run/docker.sock": {"bind": "/var/run/docker.sock", "mode": "rw"}, "/home/nate/traefik.toml": {"bind": "/etc/traefik/traefik.toml", "mode": "rw"}})
                print('created traefik container: {0}'.format(r))
                self.startContainer('traefik')
                status = self.getContainerObject('traefik').status
                print('traefik container status: {0}'.format(status))
            except Exception as ex:
                print(ex)
                return False
        else:
            print("traefik container already exists")
            return traefik

        return r

    def createContainer(self, username, imageName, port, pathPrefix=None):
        """
        Create a container for a user.
        :from: https://docker-py.readthedocs.io/en/stable/containers.html
        :param username: string, contributes to container name
        :param imageName: string, image name to use for container
        :param port: dict, port number(s) to use on container
        :param pathPrefix: traefik path prefix: '/hello' is used as a frontend rule
        :return: container object
        """

        # check if image exists already
        image = self.checkIfImageExists(imageName)
        if image is False:
            print("no image found")
            # pull image if none exists
            try:
                print("pulling image: {0}".format(imageName))
                self.pullImage(imageName)
                print('image pull successful for: {0}'.format(imageName))
            except Exception as ex:
                print(ex)

        name = imageName.split("/")

        # doesn't take commands yet.
        r_containerName = ("{0}_{1}".format(name[1], username))
        r_ports = {"{0}/tcp".format(port): None}
        r_labels = {"traefik.docker.network": username, "traefik.port": port, "traefik.frontend.rule": "PathPrefix:/{0}; Headers:user, {1};".format(pathPrefix, username), "traefik.backend.loadbalancer.sticky": "True", "traefik.enable": "true"}
        r = self.client.containers.run(imageName, detach=True, name=r_containerName, network=username, ports=r_ports, labels=r_labels)

        return r

    def startContainer(self, containerName):
        """
        Start a container by name.
        :from: https://docker-py.readthedocs.io/en/stable/containers.html
        :param containerName: string, container name to start
        :return: docker host response
        """
        # start the container in the created state
        try:
            container = self.client.containers.get(containerName)
            r = container.start()
            print(r)

        except Exception as ex:
            print(ex)

        return r

    def getContainerObject(self, containerName):
        """
        Get a container object by its name.
        :from: https://docker-py.readthedocs.io/en/stable/containers.html
        :param containerName: string, container name
        :return: container object
        """
        try:
            containerObject = self.client.containers.get(containerName)
            print(containerObject)

        except Exception as ex:
            print(ex)
            return False

        return containerObject

    def stopContainer(self, containerObject):
        """
        Stop a container.
        :from: https://docker-py.readthedocs.io/en/stable/containers.html
        :param containerObject: container object, used in conjunction with getContainerObject()
        :return: bool with status
        """
        try:
            containerObject.stop()

        except Exception as ex:
            print(ex)
            return False

        return True

    def removeContainer(self, containerName):
        """
        Remove a container by name.
        :from: https://docker-py.readthedocs.io/en/stable/containers.html
        :param containerName: string, container name to remove
        :return: docker host response
        """
        # get the container object
        container = self.getContainerObject(containerName)

        # stop the container
        self.stopContainer(container)

        # remove the container
        try:
            r = container.remove()
            if r is None:
                print("Removed container")
        except Exception as ex:
            print(ex)

        return r

    def pruneContainers(self):
        """
        Prune (remove) all stopped containers.
        :from: https://docker-py.readthedocs.io/en/stable/containers.html
        :return: bool
        """
        try:
            self.client.containers.prune()

        except Exception as ex:
            print(ex)
            return False

        return True

    def pullImage(self, imageName):
        """
        Pull a image to be used in a container.
        :from: https://docker-py.readthedocs.io/en/stable/images.html
        :param imageName: string, image name
        :return: docker host response
        """
        try:
            r = self.client.images.pull("{0}:latest".format(imageName))
            print(r)
        except Exception as ex:
            print(ex)

        return r

    def checkIfImageExists(self, imageName):
        """
        check to see if an image already exists or needs to be pulled.
        :from: https://docker-py.readthedocs.io/en/stable/images.html
        :param imageName: string, image name to check
        :return: bool
        """

        try:
            r = self.client.images.get(imageName)
            print(r)
        except Exception as ex:
            print(ex)
            return False

        return True

    def checkIfContainerExists(self, containerName):
        """
        Check to see if a con`tainer already exists.
        :from: https://docker-py.readthedocs.io/en/stable/containers.html
        :param containerName: string, container name to check
        :return: bool
        """
        try:
            self.client.containers.get(containerName)
            return True

        except Exception as ex:
            print(ex)
            return False

    def checkIfNetworkExists(self, networkName):
        """
        Check to see if a container already exists.
        :from: https://docker-py.readthedocs.io/en/stable/networks.html
        :param containerName: string, container name to check
        :return: bool
        """
        try:
            self.client.networks.get(networkName)
            return True
        except Exception as ex:
            # print("checkIfNetworkExists() {0}".format(ex))
            return False
