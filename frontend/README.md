-----------------------------------------
| 🛍️  ADMIN DASHBOARD                   |
-----------------------------------------
| [ Sidebar ]                           |
|  - Dashboard                          |
|  - Add Product                        |
|  - Manage Products                    |
|  - Orders                             |
|  - Users                              |
|  - Logout                             |
-----------------------------------------
|             MAIN AREA                 |
|---------------------------------------|
| → Dashboard Overview:                 |
|     - Total Products: 120             |
|     - Total Orders: 58                |
|     - Total Users: 32                 |
|---------------------------------------|
| → Manage Products Table:              |
|     [Image] [Title] [Price] [Edit] [Delete] |
|---------------------------------------|
| → Add Product Form:                   |
|     Title: [__________]               |
|     Price: [__________]               |
|     Description: [__________]         |
|     Image Upload: [Choose File]       |
|     [ Save Product ]                  |
-----------------------------------------


-----------------------------------------
| 🛒  ONLINE STORE                      |
-----------------------------------------
| [Navbar] Home | Products | Cart | Profile |
-----------------------------------------
|   🏠 HOME PAGE                        |
|   - Welcome Banner                    |
|   - Categories (Clothing, Shoes, Bags) |
-----------------------------------------
|   🛍️ PRODUCTS PAGE                    |
|   ----------------------------------- |
|   | 🖼️ Image | Product Title | $Price | [Add to Cart] |
|   | 🖼️ Image | Product Title | $Price | [Add to Cart] |
|   ----------------------------------- |
-----------------------------------------
|   🛒 CART PAGE                         |
|   ----------------------------------- |
|   | Product | Qty | Price | [Remove]  |
|   | Total: ₹XXXX                      |
|   [ Checkout ]                        |
-----------------------------------------
|   👤 PROFILE PAGE                      |
|   - User Info                         |
|   - Order History                     |
|   - Logout                            |
-----------------------------------------


📌 Cloudinary:

Cloud-based image/video storage service.

Returns a URL after upload.

We store only URL in our DB.

📌 Upload Flow:

Create FormData().

Append file → formData.append("file", image).

Send formData to backend API → backend uploads to Cloudinary.

Get response → { url: "https://..." }.

Save url in database.


.toLocaleString("en-IN") formats the number in Indian number system