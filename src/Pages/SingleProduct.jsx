import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const params = useParams();
  console.log(params);

  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(`https://dummyjson.com/products/${params.productId}`, {
        newProduct,
      });
    },
  });

  const fetchProduct = async () => {
    const response = await axios.get(
      `https://dummyjson.com/products/${params.productId}`
    );
    return response?.data;
  };

  const {
    data: Product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", params.productId],
    queryFn: fetchProduct,
  });

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error Ocuured : {error.message}</h1>;
  }

  if (mutation.isError) {
    return <h1>Error While Updating : {mutation.error.message}</h1>;
  }

  return (
    <div>
      <h1>SingleProduct</h1>
      <h1>{Product?.title}</h1>
      <h1>{Product?.price}</h1>
      <h1>{Product?.description}</h1>
      <h1>{Product?.category}</h1>
      <button
        onClick={() => {
          mutation.mutate({ title: "Updated Product" });
        }}
        className="bg-gray-300 p-2 rounded-md"
      >
        {mutation.isPending
          ? "Updating..."
          : mutation.isSuccess
          ? "Updated Successfully"
          : "Update Product"}
      </button>
    </div>
  );
};

export default SingleProduct;
