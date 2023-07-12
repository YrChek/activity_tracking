import { Activity } from "../types";

export function WidjetItem({ data, correction, del }: Data) {


  const clear = () => del(data.id)
  const correct = () => correction(data)

  return (
    <div className="widget-item" >
      <span className="widget-span">{data.date}</span>
      <span className="widget-span">{data.distance}</span>
      <div className="widget-image">
        <div className="image-item correct" onClick={correct}></div>
        <div className="image-item delеte"  onClick={clear} ></div>
      </div>
    </div>
  )
} 

type Data = {
  data: Activity,
  correction: (data: Activity) => void
  del: (id: string) => void
}
