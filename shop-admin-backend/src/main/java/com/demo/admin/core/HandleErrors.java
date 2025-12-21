import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class HandleErrors {

    /**
     * 400: Máy chủ không thể hiểu yêu cầu do cú pháp không hợp lệ.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> badRequest(String message) {
        return _createResponse(HttpStatus.BAD_REQUEST, message);
    }

    /**
     * 401: Cho dù quy chuẩn HTTP chỉ định “unauthorized” (không có thẩm quyền),
     * nhưng nó có nghĩa phản hồi này là “unauthenticated” (chưa được xác thực). Có
     * nghĩa là, client phải các tự xác thực chính mình để nhận được phản hồi đã yêu
     * cầu.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> Unauthorized(String message) {
        return _createResponse(HttpStatus.UNAUTHORIZED, message);
    }

    /**
     * 402: Code phản hồi này được dành cho những lần sử dụng trong tương lai. Mục
     * đích ban đầu của việc tạo mã này là sử dụng nó cho các hệ thống thanh toán kỹ
     * thuật số, tuy nhiên status code này rất hiếm khi được sử dụng và không tồn
     * tại quy ước tiêu chuẩn nào.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> PaymentRequired(String message) {
        return _createResponse(HttpStatus.PAYMENT_REQUIRED, message);
    }

    /**
     * 403: Client không có quyền truy cập vào phần nội dung, nghĩa là nó không được
     * phép, vì vậy máy chủ từ chối cung cấp tài nguyên được yêu cầu. Không giống
     * như 401, danh tính của client đã được máy chủ nhận biết.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> Forbidden(String message) {
        return _createResponse(HttpStatus.FORBIDDEN, message);
    }

    /**
     * 404: NotFound
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> NotFound(String message) {
        return _createResponse(HttpStatus.NOT_FOUND, message);
    }

    /**
     * 405: Phương thức yêu cầu được máy chủ nhận biết nhưng đã bị vô hiệu hóa và
     * không thể sử dụng được. Ví dụ: 1 API có thể cấm XÓA 1 nguồn tài nguyên. 2
     * phương thức bắt buộc, GET và HEAD, không bao giờ được vô hiệu hóa và không
     * được trả về code lỗi này.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> MethodNotAllowed(String message) {
        return _createResponse(HttpStatus.METHOD_NOT_ALLOWED, message);
    }

    /**
     * 406: Phản hồi này được gửi khi máy chủ web, sau khi thực hiện server-driven
     * content negotiation, không tìm thấy bất kỳ nội dung nào phù hợp với các tiêu
     * chí do user-agent đưa ra.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> Acceptable(String message) {
        return _createResponse(HttpStatus.NOT_ACCEPTABLE, message);
    }

    /**
     * 407: Code này tương tự như 401 nhưng việc xác thực là cần thiết để được
     * thực hiện bởi proxy.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> ProxyAuthenticationRequired(String message) {
        return _createResponse(HttpStatus.PROXY_AUTHENTICATION_REQUIRED, message);
    }

    /**
     * 408: Phản hồi này được gửi trên 1 kết nối idle bởi 1 số máy chủ, ngay cả
     * khi không có bất kỳ yêu cầu nào trước đó của client. Có nghĩa là máy chủ muốn
     * tắt kết nối không sử dụng này. Phản hồi này được sử dụng nhiều hơn vì 1 số
     * trình duyệt như Chrome, Firefox 27+ hoặc IE9, sử dụng cơ chế tiền kết nối
     * HTTP để tăng tốc độ lướt web. Cũng lưu ý rằng 1 số máy chủ chỉ tắt kết nối
     * luôn mà không hề gửi thông báo này.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> RequestTimeout(String message) {
        return _createResponse(HttpStatus.REQUEST_TIMEOUT, message);
    }

    /**
     * 409: Phản hồi này được gửi khi 1 yêu cầu xung đột với trạng thái hiện tại
     * của máy chủ.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> conflict(String message) {
        return _createResponse(HttpStatus.CONFLICT, message);
    }

    /**
     * 410: Phản hồi này được gửi khi nội dung được yêu cầu đã bị xóa vĩnh viễn
     * khỏi máy chủ, không có địa chỉ chuyển tiếp. Client phải xóa bộ nhớ cache và
     * liên kết của mình tới nguồn tài nguyên. HTTP spectication dự định status code
     * này được sử dụng cho “các dịch vụ khuyến mại, có thời hạn”. Các API không nên
     * bắt buộc phải chỉ ra các tài nguyên đã bị xóa bằng status code này.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> Gone(String message) {
        return _createResponse(HttpStatus.GONE, message);
    }

    /**
     * 411: Máy chủ đã từ chối yêu cầu vì trường header Content-Lenghth không được
     * xác định và máy chủ thì yêu cầu chuyện đó.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> LengthRequired(String message) {
        return _createResponse(HttpStatus.LENGTH_REQUIRED, message);
    }

    /**
     * 412: Client đã chỉ ra các điều kiện tiên quyết trong các header của nó mà máy
     * chủ không đáp ứng được.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> PreconditionFailed(String message) {
        return _createResponse(HttpStatus.PRECONDITION_FAILED, message);
    }

    /**
     * 413: Thực thể yêu cầu lớn hơn giới hạn do máy chủ xác định, máy chủ có thể
     * đóng kết nối hoặc trả về trường header Retry-After.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> PayloadTooLarge(String message) {
        return _createResponse(HttpStatus.PAYLOAD_TOO_LARGE, message);
    }

    /**
     * 414: URI được yêu cầu bởi client dài hơn mức máy chủ muốn thông dịch.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> URITooLong(String message) {
        return _createResponse(HttpStatus.URI_TOO_LONG, message);
    }

    /**
     * 415: Định dạng phương tiện của dữ liệu được yêu cầu không được máy chủ hỗ
     * trợ, do đó máy chủ đang từ chối yêu cầu.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> UnsupportedMediaType(String message) {
        return _createResponse(HttpStatus.UNSUPPORTED_MEDIA_TYPE, message);
    }

    /**
     * 416: Client yêu cầu một phần của tập tin nhưng máy chủ không thể cung cấp
     * nó. Trước đây được gọi là “Requested Range Not Satisfiable”.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> RangeNotSatisfiable(String message) {
        return _createResponse(HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE, message);
    }

    /**
     * 417: Máy chủ không thể đáp ứng các yêu cầu của trường Expect trong header.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> ExpectationFailed(String message) {
        return _createResponse(HttpStatus.EXPECTATION_FAILED, message);
    }

    /**
     * 500: Một thông báo chung, được đưa ra khi máy chủ gặp phải một trường hợp
     * bất ngờ, message cụ thể không phù hợp.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> InternalServerError(String message) {
        return _createResponse(HttpStatus.INTERNAL_SERVER_ERROR, message);
    }

    /**
     * 501: Máy chủ không công nhận các phương thức yêu cầu hoặc không có khả năng
     * xử lý nó.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> NotImplemented(String message) {
        return _createResponse(HttpStatus.NOT_IMPLEMENTED, message);
    }

    /**
     * 502: Máy chủ đã hoạt động như một gateway hoặc proxy và nhận được một phản
     * hồi không hợp lệ từ máy chủ nguồn.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> BadGateway(String message) {
        return _createResponse(HttpStatus.BAD_GATEWAY, message);
    }

    /**
     * 503: Máy chủ hiện tại không có sẵn (hiện đang quá tải hoặc bị down để bảo
     * trì). Đây chỉ là trạng thái tạm thời.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> ServiceUnavailable(String message) {
        return _createResponse(HttpStatus.SERVICE_UNAVAILABLE, message);
    }

    /**
     * 504: Máy chủ đã hoạt động như một gateway hoặc proxy và không nhận được một
     * phản hồi từ máy chủ nguồn.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> GatewayTimeout(String message) {
        return _createResponse(HttpStatus.GATEWAY_TIMEOUT, message);
    }

    /**
     * 505: Máy chủ không hỗ trợ phiên bản “giao thức HTTP”.
     * 
     * @param {String} message
     * @return {ResponseEntity<Map<String, Object>>}
     */
    public ResponseEntity<Map<String, Object>> HTTPVersionNotSupported(String message) {
        return _createResponse(HttpStatus.HTTP_VERSION_NOT_SUPPORTED, message);
    }

    /**
     * @param {String}     message
     * @param {HttpStatus} status
     * @return {ResponseEntity<Map<String, Object>>}
     */
    private static ResponseEntity<Map<String, Object>> _createResponse(HttpStatus status, String message) {
        return ResponseEntity
        .status(status)
        .body(
            Map.of(
                "err", -1, 
                "msg", message
            )
        );
    }
}