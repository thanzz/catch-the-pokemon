export default function ScoreCard({ score }) {
    return (
        <div className='score-card'>
            <span>{score}</span> / <span>5</span>
        </div>
    )
}