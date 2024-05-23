#Authentication - Xác thực

Kiểm tra user có tồn tại trong database hay không
-md5, sha1 --> Mã hóa 1 chiều -> không an toàn
- bcrypt -> Hàm băm (hash) -> An toàn
Logic:
+ Truy vấn lấy user theo email
+ Lấy được hash password từ db
+ Đưa hash pass và plain pass (pass từ input) thông qua hàm compare để so sánh

- Session-Based
==> lấy được thông tin user -> Lưu vào session

- Token-Based
==> Sau khi lấy được thông tin user -> Lưu vào token (JWT)

Nhược điểm nếu xác thực theo cách thủ công
- Xây dựng lâu
- Không đồng nhất(Mỗi ô code 1 kiểu)
- Bảo mật
- Tích hợp đăng nhập qua mạng xã hội gây mất time và khó cho người mới
Giải pháp: Dùng thư viện chuyên dụng (passport.js)

#Đăng nhập thông qua mạng xã hội
- Sử dụng thông tin của mạng xã hội để đăng nhập vào hệ thống web mà ko cần sử dụng mật khẩu
- Phổ biến ở tất cả các web
Ví dụ: đăng nhập với Google
Click vào nút "Đăng nhập với Google" => redirect qua trang đăng nhập của Google ==> Người dùng đăng nhập -> chuyển hướng ngược lại về web(Callback URL) -> Đi kèm authcode ==> Dựa vào authcode để lấy thông tin từ mạng xã hội đã đăng nhập => insert vào database(Nếu trong db ko tồn tại, nếu tồn tại lấy luôn thông tin trong db)

##Phân tích database

Bảng providers: Chứa thông tin các hình thức đăng nhập
- id
- name
- created_at
- updated_at

Bảng users: chứa thông tin user đăng nhập
- id
- name
- email
- password
- provider_id
- created_at
- updated_at

1.Chức năng đăng kí tài khoản
- Kiểm tra trong bảng providers có name là email hay không?
--> Không có --> Insert provider mới có name là email sau đó lấy về provider_id
-> Có -> lấy provider_id
- insert dữ liệu vào bảng users

2. Chức năng đăng nhập
- Truy vấn thêm provider_id

3. Chức năng đăng nhập thông qua mạng xã hội
- Lấy thông tin mạng xã hội
- Quay về bước 1

<!-- passport-google-oauth20 -->
