
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useLocation } from 'react-router-dom';


export function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60  ">
      <div className="container flex h-16 items-center cursor-pointer justify-between mx-auto ">
        <div className="flex items-center gap-2" onClick={()=>{
            navigate("/");
        }}>
          <Package className="h-6 w-6" />
          <span className="font-medium text-lg">ProductHub</span>
        </div>
        {location.pathname === "/" ? <div>
          <Button onClick={()=>{navigate('/submit')}} variant={"ghost"} className='bg-slate-50'>Add Product</Button>
        </div>: 
        <div>
          <Button onClick={()=>{navigate('/')}} variant={"ghost"} className='bg-slate-50'>Dashboard</Button>
        </div>}
      </div>
    </header>
  );
}