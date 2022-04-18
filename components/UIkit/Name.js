import { useSWRUser } from "../customHook";
import { Data, Error } from "../useSWRInfo";

export default function Name() {
  const {data, error } = useSWRUser()
  if(error) return <Error/>
  if(!data) return <div>名前が入るよ</div>

  return (
    <>
      <p className="font-bold">あなたの名前: {data.name}</p>
    </>
  );
}

