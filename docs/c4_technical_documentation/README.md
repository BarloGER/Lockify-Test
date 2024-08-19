# Structurizr Lite

## How to View the C4 Technical Documentation

To view the C4 technical documentation, you first need to have Docker installed. The easiest way to get Docker is by downloading the Docker Desktop application.

Once Docker is installed, you need to install the free, open-source program [Structurizr Lite](https://docs.structurizr.com/lite/quickstart). You can follow the instructions provided in the link, or you can use the following steps:

1. **Pull the Docker Image**

   Run the following command to pull the Structurizr Lite Docker image:

   ```bash
   docker pull structurizr/lite
   ```

2. **Run the Docker Container**

   Use the command below to run the Structurizr Lite container. Be sure to replace `/path to Lockify/Lockify/docs/...` with the actual path to your C4 technical documentation:

   ```bash
   docker run -it --rm -p 8080:8080 -v /path to Lockify/Lockify/docs/c4_technical_documentation:/usr/local/structurizr structurizr/lite
   ```

3. **View the Documentation**

   Open your web browser and navigate to [http://localhost:8080](http://localhost:8080) to view the documentation.
