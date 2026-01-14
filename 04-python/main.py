from fastapi import FastAPI
from model import Product

app = FastAPI()

@app.get("/")
def greet():
    return "Welcome to FastApi Development"

products = [
    Product(id=1, name='mobile', description='buget mobile', price=99, quantity=10),
    Product(id=2, name='laptops', description='Gaming Laptop', price=999, quantity=6),
    Product(id=4, name='TV', description='4K QLED TV ', price=876, quantity=15)
]

@app.get("/all-products")
def get_all_products():
    return products

@app.get("/product/{id}")
def get_product_by_id(id: int):
    for product in products:
        if product.id == id:
           return product
        
    return "product not found"

@app.post("/product")
def add_product(product: Product):
    products.append(product)
    return product

@app.put("/product")
def update_product(id: int, product: Product):
    for i in range(len(products)):
        if products[i].id == id:
            products[i] = product
            return "Product updated successfully"

    return "Product not found"

@app.delete("/product")
def delete_product(id: int):
    for i in range(len(products)):
        if products[i].id == id:
            del products[i]
            return "product deleted"
        
    return "product not found"
