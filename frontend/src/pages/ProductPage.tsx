import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProduct } from '@/api/product'; // Changed function name
import { ProductCard } from '@/components/ProductCard';
import { Loader2 } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useDebounce } from 'use-debounce';

const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [debounceQuery] = useDebounce(searchQuery, 1000);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", debounceQuery, currentPage], 
    queryFn: () => getProduct(debounceQuery, currentPage), 
    staleTime: 1000 * 60 * 5 // 5 minutes cache
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [debounceQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
    <Navbar />
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center mt-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {isError && (
        <p className="text-red-500 text-center mt-8">
          Failed to load products
        </p>
      )}
        {data && data.products.length === 0 && (
          <p className="text-slate-500 text-center mt-8">
            No products to show here
          </p>
        )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.products.map(product => ( // Added optional chaining
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

        {data && data?.meta.totalCount > 1 && (<div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-300 rounded-xl cursor-pointer"
          >
            Previous
          </button>

          <span className="px-4 py-2">
            Page {data?.meta.currentPage} of {data?.meta.totalPages}
          </span>

          <button
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage === data?.meta.totalPages}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white  disabled:bg-gray-300 rounded-xl cursor-pointer"
          >
            Next
          </button>
        </div> )
        }
    </div>
  </div>
  );
}

export default ProductPage;