# Mô hình MVCS (Model View Controller Service)

Request ==> Global Middleware ==> Route ==> Route Middleware => Controller ==> Service ==> Model ==> Database


## Controller

- Tiếp nhận request
- Gọi Request(class) --> Validate --> pass call service
- Gọi Service --> Chứa logic nghiệp vụ
- Gọi view/transformer

## Service
- Lấy dữ liệu từ controller
- Thao tác với Model --> trả về trạng thái, data
- Trả về dữ liệu cho controller
(khi làm việc với nhiều bảng)

# Helper/Utils
- ko liên quan đến db
- Xử lí ở tầng dữ liệu (request, response)
* Xây dựng hàm bỏ dấu tiếng việt 
* Xây dựng hàm định dạng time
* Xây dựng tạo token từ JWT
* Xây dựng hàm verify token
* Xây dựng hàm mã hóa password
* Xây dựng hàm so sánh password
* Xây dựng hàm kiểm tra độ mạnh yếu mật khẩu

## Helper
- Áp dụng trong các TH ko cụ thể
- Ví dụ: hàm bỏ dấu tiếng Việt, định dạng time

## Util
- cụ thể hóa trong các chức năng
Vd: hàm tạo token, so sánh token, mã hóa password,...(vd: sử dụng trong authen)

