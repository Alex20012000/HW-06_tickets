import style from './ShowMore.module.scss';

interface Props {
    loadMoreHandler: () => void;
}

const ShowMore: React.FC<Props> = ({ loadMoreHandler }) => {
    return (
        <button className = {style.showMore} onClick = {loadMoreHandler}>
            Загрузить ещё билеты
        </button>
    );
}

export default ShowMore;
