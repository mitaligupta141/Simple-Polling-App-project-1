using Models.Items.Response;

namespace Models.Common
{
  
        public class ApiResponse<T>
        {
        private string v;

        public ApiResponse() { }

            public ApiResponse(T data)
            {
                Success = true;
                Message = "Success";
                Data = data;
                StatusCode = 200;
            }

        public ApiResponse(string v)
        {
            this.v = v;
        }

        public T Data { get; set; }
            public string Message { get; set; }
            public bool Success { get; set; }
            public int StatusCode { get; set; }
        }
    

}
