"use client"

export default function InputPrice({price}) {
  return (
    <input type="text" className="price" name="price" defaultValue={price} placeholder="$가격을 입력해주세요." onKeyUp={(e)=>{
      let value = e.target.value;
      const input = document.querySelector('.price')
      value = Number(value.replaceAll(',', ''));
      if(isNaN(value)) {         //NaN인지 판별
        input.value = 0;   
      }else {                   //NaN이 아닌 경우
        const formatValue = value.toLocaleString('ko-KR');
        input.value = formatValue;
      }
    }} />
  );
}

export {InputPrice}
