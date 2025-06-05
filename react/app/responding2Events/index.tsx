
function Button({ onClick, children }) {
    return (
        <button onClick={e => {
            e.stopPropagation()
            onClick()
        }}>
            {children}
        </button>
    )
}

export default function Toolbar() {
  return (
    <div className="bg-red" onClick={() => alert('你点击了 toolbar ！')}>
      <Button onClick={() => {
        alert('正在播放！')
      }}>
        播放电影
      </Button>
      <Button onClick={() => alert('正在上传！')}>
        上传图片
      </Button>
    </div>
  );
}