import React, { useState } from "react";
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { nanoid } from "nanoid";
import { Widjet } from "../Widget/Widjet";
import { Activity } from "../types";

dayjs.locale('ru');
dayjs.extend(customParseFormat)

const initForm: Activity = {
  id: '',
  date: '',
  distance: '',
  correct: false,
}

import './Panel.css'
export function Panel() {
  
  const [form, setForm] = useState(initForm);
  const [listActiv, setListActiv] = useState([initForm])

  const handlerSubmit = (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    listActiv.map(obj => {
            obj.date === dayjs(form.date, ['DD.MM.YYYY', 'DD.MM.YY', 'D.MM.YY', 'D.M.YY']).format('DD.MM.YYYY')
            ? (obj.distance = `${Number(obj.distance) + Number(form.distance)}`, setForm({...form, correct: true})) 
            : null
          })
    
    setForm(prevForm => {
      const date = dayjs(form.date, ['DD.MM.YYYY', 'DD.MM.YY', 'D.MM.YY', 'D.M.YY'])
      const newObj = {
        id: nanoid(),
        date: date.format('DD.MM.YYYY'),
        distance: form.distance,
        correct: false
      }
      if (prevForm.correct) {
        setListActiv([...listActiv])
      } else {
        setListActiv([...listActiv, newObj])
      }
      return {...prevForm, correct: false}
    })

    setForm(initForm)
  }


  const handlerDelete = (id:string) => {
    setListActiv(listActiv.filter(obj => obj.id !== id))
  }

  const handlerCorrection = (data:Activity) => {
    setForm({...data, date:data.date, distance:data.distance})
    setListActiv(listActiv.filter(obj => obj.id !== data.id))
  }

  const handlerChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value})
  }



  return (
    <>
      <form className="form" onSubmit={handlerSubmit}>
        <label className="form-group">
          <span className="form-span" >Дата (ДД.ММ.ГГ)</span>
          <br />
          <input type="text" className="input" name='date' value={form.date} onChange={handlerChange} required />
        </label>
        <label className="form-group">
          <span className="form-span">Пройдено км</span>
          <br />
          <input type="text" className="input" name='distance' value={form.distance} onChange={handlerChange} required />
        </label>
        <button className="btn">OK</button>
      </form>
      <Widjet listActiv={listActiv} correction={handlerCorrection} del={handlerDelete}/>
    </>
  )
}
