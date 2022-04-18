import { IconButton } from '@material-ui/core'
import AddPhotoAlternateIcon from '@material-ui/icons//AddPhotoAlternate'


export default function ImageArea(props) {
  return (
    <div>
      <div className="">
        <span className="text-xl">ゲーム画像を登録する</span>
        <label>
          <input className="hidden" data-testid="custom-element" type="file" id="image" onChange={props.onChange} />
          <IconButton aria-label="upload picture" component="span">
            <AddPhotoAlternateIcon />
          </IconButton>
        </label>
      </div>
    </div>
  );
}