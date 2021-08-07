![](https://www.ashwinhariharan.tech/blog/thinking-of-building-a-contact-tracing-application-heres-what-you-can-do-instead/index.png)
# Kartpool
> Community driven delivery platform for the ones who need it the most

### This repository contains the complete source-code for the blog post:
[Thinking of building a contact-tracing application? Here's what you can do instead.](https://www.ashwinhariharan.tech/blog/thinking-of-building-a-contact-tracing-application-heres-what-you-can-do-instead/)

### App Screenshot
![](https://miro.medium.com/max/1835/1*ROFwy3bSYmWy39qLmlTZTw.png)

## Instructions to install

1. **Install PostgreSQL and PostGIS**
I highly recommend a Docker installation:
    - Install [Docker](https://docs.docker.com/get-docker/)
    - Download and run the official [PosgreSQL/PostGIS docker image](https://registry.hub.docker.com/r/postgis/postgis/)

    Alternatively, you can perform an installation directly on the host operating system:
    - [Download](https://www.postgresql.org/download/) the official PostgreSQL installer for your system.
    - [Install](https://postgis.net/install/) the PostGIS extension

2. **Install `python3.7` and `pip3`**

3. **Install [GDAL](https://gdal.org/) (Required for Django to interface with PostGIS)**
    - `sudo apt-get install libpq-dev python-dev`
    - `sudo apt-get install binutils libproj-dev gdal-bin`

4. **Create a python virtual environment using `venv`**
    `python -m venv ~/python-virtual-environments/kartpool`

5. **Activate virtual environment**
    `source ~/python-virtual-environments/kartpool/bin/activate`

6. **Install Django and other dependencies**
    `pip install -r requirements.text`

## Instructions to run

1. **Start PostgreSQL database service**
    If you installed via docker, run `docker run --name kartpool-postgis -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgis/postgis`

2. **Start Django web server (Make sure the virtual environment is activated)**
    `python manage.py runserver`

3. **Follow the tutorial!**


## To write psql queries
1. SSH into your Postgres docker container: `docker exec --user postgres -it kartpool-postgis /bin/bash` (Skip this step if you have a native PostgreSQL installation)
2. Run `psql` on the terminal

Once you connect to the database, enable the PostGIS extension by typing `enable extension postgis`

# Credits

I've had much help from this [excellent tutorial](https://realpython.com/location-based-app-with-geodjango-tutorial/)

# Have any questions?

Say _hi_ 👋 on:

- [Github Discussions](https://github.com/booleanhunter-tech-blog/kartpool/discussions)
- [Blog Forum](https://forum.booleanhunter.com/t/thinking-of-building-a-contact-tracing-application-here-s-what-you-can-do-instead/38)