import AddIcon from '@material-ui/icons/Add';
import AirplayIcon from '@material-ui/icons/Airplay';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import SettingsIcon from '@material-ui/icons/Settings';
import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex mt-16 w-screen max-w-full bg-purple-50">
      <div className="w-1/4 hover:bg-purple-100">
        <Link href="/posts/playing">
          <a  className="block font-serif text-xl">
            <div className="flex justify-center py-2.5 space-x-3">
              <div className="md:pt-0.5">
              <AirplayIcon fontSize="small"/>
              </div>
              <span className="pt-1.5 text-xs font-bold md:text-base">
                ゲームちぅ
              </span>
            </div>
          </a>
        </Link>
      </div>
      <div className="w-1/4 hover:bg-purple-100">
        <Link href="/posts/list">
          <a  className="block font-serif text-xl">
            <div className="flex justify-center py-2.5 space-x-3">
              <div className="md:pt-0.5">
              <FormatListBulletedIcon fontSize="small"/>
              </div>
              <span className="pt-1.5 text-xs font-bold md:text-base">
                つみあげたもの
              </span>
            </div>
          </a>
        </Link>
      </div>
      <div className="w-1/4 hover:bg-purple-100">
        <Link href="/posts/new">
          <a  className="block font-serif text-xl">
            <div className="flex justify-center py-2.5 space-x-3">
              <div className="md:pt-0.5">
              <AddIcon fontSize="small"/>
              </div>
              <span className="pt-1.5 text-xs font-bold md:text-base">
                あたらしいの
              </span>
            </div>
          </a>
        </Link>
      </div>
      <div className="w-1/4 hover:bg-purple-100">
        <Link href="/posts/setting">
          <a  className="block font-serif text-xl">
            <div className="flex justify-center py-2.5 space-x-3">
              <div className="md:pt-0.5">
              <SettingsIcon fontSize="small"/>
              </div>
              <span className="pt-1.5 text-xs font-bold md:text-base">
                いろいろ
              </span>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
}