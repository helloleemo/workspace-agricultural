type Props = { params: { id: string } };

export default function ProductDetailPage({ params }: Props) {
  return <h1>檢視單一農產品 #{params.id}</h1>;
}