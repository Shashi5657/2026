# Clean Architure

```
This folder structure is Single Responsibility Principle
Each folder has one respective responsibility
```

> We'll start with creating Entities first - which is pure business logic - It won't have express, jwt, db
> like for exmaple of user creation
> Next we'll go to services, here we write services code example of password & token related, hashing password, compare pasword, signing tokens verifying tokens - these are services
> next we'll jump into repositories, we'll write the db lodic here but not with the exact direct models
> Then we'll jump to use case where all the business logic lies here example of register user
> then we'll write controllers & then jump to middlewares
