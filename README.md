# BiteSpeed Recruitment Task

## Backend Documentation: [Click here :bookmark_tabs:](https://documenter.getpostman.com/view/21780682/2sA3XMjj8d)

## Deployed Link: (Deployed on AWS EC2 instances :cloud:) [ec2-3-110-216-182.ap-south-1.compute.amazonaws.com](ec2-3-110-216-182.ap-south-1.compute.amazonaws.com)

## Running Project Locally

1. **Node.js Version:**
   - The project requires Node.js. Ensure that you have Node.js installed. If not, download and install it from [Node.js official website](https://nodejs.org/).

2. **Clone the Repository:**
   - Clone the repository to your local machine using the following command:
     ```bash
     git clone https://github.com/vivindeena/gyangrove.git
     ```

3. **Change Directories:**
   - Switch to the cloned directory, and then to the setup folder:
     ```bash
     cd bitespeed/setups/
     ```

4. **Environment Variables Setup:**
   - Create an `.env` file in the root directory of the project.
   - Add the following variables to the `.env` file and assign values to them. You can use the provided `.env.example` file as a reference.

5. **Running the project:**
   - Execute the setup script:
     ```bash
     sudo sh setup.sh
     ```
     If unable to execute, give necessary executable permission. For example:
     ```bash
     chmod +x setup.sh
     ```

6. **Accessing the Project:**
   - You can access the application using the fllowing URL to access the project locally:
     ```
     http://localhost:<PORT>
     ```
     Replace `<PORT>` with the port number specified in your `.env` file.

7. **Starting and Stopping the project:**
   - To start and stop the project, navigate to the same folder and,

   - To start the Docker containers:
     ```bash
     docker-compose up
     ```
   - To stop the Docker containers, use:
     ```bash
     docker-compose down
     ``` 


## Possible Improvements
1. User segregration for DB to imporve security

2. Implement a logging library like ```winston``` to log HTTP requests and other important information.

3. Add a global error handler middleware to handle any uncaught exceptions or unhandled promise rejections.

4. User authenticaltion using libraries like ```jsonwebtoken``` and ```passportjs``` 

5. Implementaion of docker swarm and to scale the solution horizontally


## Tasks :white_check_mark:

- [X] Setup file structure.

- [X] Setup a PostgreSQL Container.

- [X] Design Tables for the database schema.

- [X] Write Scripts to set up the databases and tables.

- [X] Develop the Identify API endpoint.

- [X] Containerize the application for deployment.

- [X] Writing the Docker Compose file.

- [X] Deploy in AWS

- [X] Finish Documentation


