
import { Navbar } from '@/components/Navbar'
import ProductForm from '../components/ProductForm'

const SubmisionPage = () => {
  return <div className="min-h-screen flex flex-col bg-background">
    <Navbar />
    <main className="flex-1 flex items-center justify-center">
      <div className="container w-full ">
      
          <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">
            Product Manager
          </h1>
          <ProductForm />
      
        </div>
    </main>
  </div>
}

export default SubmisionPage
