CREATE TABLE Users (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Date_Created TEXT NOT NULL,
    Name TEXT NOT NULL,
    Email TEXT NOT NULL UNIQUE,
    Password TEXT NOT NULL,
    User_Role TEXT NOT NULL CHECK(User_Role IN ('Admin', 'Shopper'))
);

CREATE TABLE Categories (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL UNIQUE,
    Priority_Level INTEGER NOT NULL
);

CREATE TABLE Products (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Description TEXT NOT NULL,
    Image_Url TEXT NOT NULL,
    Price REAL NOT NULL,
    Stock INTEGER NOT NULL,
    Category_Id INTEGER NOT NULL,
    Featured_Status BOOLEAN NOT NULL DEFAULT 0,
    FOREIGN KEY (Category_Id) REFERENCES Categories(Id)
);

CREATE TABLE Carts (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Status TEXT NOT NULL CHECK(Status IN ('new', 'abandoned', 'purchased')),
    Date_Created TEXT NOT NULL,
    User_Id INTEGER NOT NULL,
    FOREIGN KEY (User_Id) REFERENCES Users(Id)
);

CREATE TABLE CartProducts (
    Id INTEGER PRIMARY KEY AUTOINCREMENT,
    Cart_Id INTEGER NOT NULL,
    Product_Id INTEGER NOT NULL,
    Quantity INTEGER NOT NULL,
    FOREIGN KEY (Cart_Id) REFERENCES Carts(Id),
    FOREIGN KEY (Product_Id) REFERENCES Products(Id)
);
