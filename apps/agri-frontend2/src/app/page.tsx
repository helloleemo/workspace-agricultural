import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Index() {
  return (
    <div className="p-5">
      <p>INDEX</p>
      <Button variant="outline">
        <Link href="/products">Products</Link>
      </Button>
    </div>
  );
}
