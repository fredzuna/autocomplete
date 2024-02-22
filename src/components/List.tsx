import useItemFocus from "../hooks/useItemFocus";
import IDataItem from "../interfaces/IDataItem";
import HighlightedText from "./HighlightedText";
import Item from "./Item";

interface IProps {
    data: IDataItem[];
    handleSelectItem: (item: IDataItem) => void;
    filterText: string;
}

export default function List(props: IProps) {
    const { data, handleSelectItem, filterText } = props;
    const [currentFocus, setCurrentFocus] = useItemFocus(data.length);

    return (
        <ul id="ul-items" className='container-items'>
            {data.map((item, index) => (
                <Item
                    key={item.id}
                    item={item}
                    focus={currentFocus === index}
                    index={index}
                    setCurrentFocus={setCurrentFocus as React.Dispatch<React.SetStateAction<number>>}
                    handleSelectItem={handleSelectItem}
                >
                    <HighlightedText item={item} filterText={filterText} />
                </Item>
            ))}
        </ul>
    );
}