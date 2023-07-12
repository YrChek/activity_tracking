import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Activity, ListActivity } from "../types";
import { WidjetItem } from "./WidjetItem";
import './Widjet.css';

dayjs.locale('ru');
dayjs.extend(customParseFormat)


export function Widjet({ listActiv, correction, del}: Lists) {

  listActiv.sort((a, b) => Number(dayjs(b.date, 'DD.MM.YYYY').unix()) - Number(dayjs(a.date, 'DD.MM.YYYY').unix()) )

  return (
    <div className="display">
      <div className="display-title">
        <span className="display-span">Дата (ДД.ММ.ГГ)</span>
        <span className="display-span">Пройдено км</span>
        <span className="display-span">Действия</span>
      </div>
      <div className="display-widget">
        { listActiv.map((el) => el.id ? <WidjetItem data={el} correction={correction} key={el.id} del={del}/> : null) }
      </div>
    </div>
  )
}

type Lists = {
  listActiv: ListActivity
  correction: (data: Activity) => void
  del: (id: string) => void
}
