# Project 2
A "College Stuff" webstore.

## Endpoints

- /User
    - /User/Create

        Request
        ```json
        {
            "username": "kevin1",
            "password": "pass1",
            "firstname": "kevin",
            "lastname": "guzman"
        }
        ```

        Response
        ```json
        {
            "successful": true or false,
            "msg": ""
        }
        ```

    - /User/Login

        Request
        ```json
            {
                "username": "kevin1",
                "password": "pass1",
            }
        ```

        Response
         ```json
        {
            "successful": true or false,
            "msg": ""
        }
        ```

    - /User/Logout

        Response
         ```json
        {
            "successful": true or false,
            "msg": ""
        }
        ```

- Product

- Order