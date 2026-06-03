/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      data - данные для фильтрации
    filtering - функция обновления данных для фильтрации
*/
const Filter = (props) => {

  const handleReset = () => {
    props.filtering(props.fullData);
  }
  const handleSubmit = (event) => {
    event.preventDefault();

    // создаем словарь со значениями полей формы
    const filterField = {
      "Название": event.target["structure"].value.toLowerCase(),
      "Тип": event.target["type"].value.toLowerCase(),
      "Страна": event.target["country"].value.toLowerCase(),
      "Город": event.target["city"].value.toLowerCase(),
      "мин_Год": Number(event.target["year_from"].value),
      "макс_Год": Number(event.target["year_to"].value),
      "мин_Высота": Number(event.target["high_from"].value),
      "макс_Высота": Number(event.target["high_to"].value)
    };

    //фильтруем данные по значениям всех полей формы
    let arr = props.fullData;
    for (const key in filterField) {
      if (key.startsWith("макс_")) continue;

      const val = filterField[key];
      if (!val && val !== 0) continue;

      arr = arr.filter(item => {
        if (item[key] !== undefined) {
          return item[key].toLowerCase().includes(val);
        }
        const baseKey = key.slice(4);
        const max = filterField["макс_" + baseKey];
        return (!val || item[baseKey] >= val) && (!max || item[baseKey] <= max);
      });
    }

    //передаем родительскому компоненту новое состояние - отфильтрованный массив
    props.filtering(arr);
  }


  return (
    <form onSubmit={handleSubmit} onReset={handleReset}>
      <p>
        <label>Название:</label>
        <input name="structure" type="text" />
      </p>
      <p>
        <label>Тип:</label>
        <input name="type" type="text" />
      </p>
      <p>
        <label>Страна:</label>
        <input name="country" type="text" />
      </p>
      <p>
        <label>Город:</label>
        <input name="city" type="text" />
      </p>
      <p>
        <label>Год от:</label>
        <input name="year_from" type="number" />
      </p>
      <p>
        <label>Год до:</label>
        <input name="year_to" type="number" />
      </p>
      <p>
        <label>Высота от:</label>
        <input name="high_from" type="number" />
      </p>
      <p>
        <label>Высота до:</label>
        <input name="high_to" type="number" />
      </p>
      <p>
        <button type="submit">Фильтровать</button>
        <button type="reset">Очистить фильтр</button>
      </p>
    </form>
  )
}

export default Filter;
