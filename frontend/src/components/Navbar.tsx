
import { Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
    const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-5 mx-auto">
      <div className="container flex h-16 items-center cursor-pointer">
        <div className="flex items-center gap-2" onClick={()=>{
            navigate("/");
        }}>
          <Package className="h-6 w-6" />
          <span className="font-medium text-lg">ProductHub</span>
        </div>
      </div>
    </header>
  );
}