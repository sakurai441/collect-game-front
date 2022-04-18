const Introduction = (props) => {
  return (
    <div className="p-6 mb-14 border-2 border-green-500/5">
      <h2 className="mt-36 font-medium text-left text-blue-700">{props.title} :</h2>
      <p className="mt-6 mb-20 leading-7 text-left whitespace-pre-wrap">
        {props.content}
      </p>
    </div>
  )
}

export default Introduction