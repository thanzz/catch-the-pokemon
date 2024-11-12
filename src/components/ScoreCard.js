
export default function ScoreCard({ score, winningScore }) {
    return (
        <div className='score-card'>
            <span>{score}</span> / <span>{winningScore}</span>
        </div>
    )
}