import './scoreBadge.css'

const ScoreBadge = ({data}) => {

    const test = () =>{
        let starNumber = Math.round(data.averageScore / 2)
        let stars = [];
        for (let i = 1; i <= starNumber; i++) {
            stars.push(<p key={i}>⭐</p>);
        }
        return stars
    }
  
  return (
    <div className='scoreBadge__conteiner'>
       <div className='scoreBadge__stars'>{test()}</div>
       <div className='scoreBadge__votes'>Votes: {data.totalVote}</div>
    </div>
  )
}

export default ScoreBadge