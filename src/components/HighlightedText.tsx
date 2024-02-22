import IDataItem from "../interfaces/IDataItem";

interface IProp {
    item: IDataItem;
    filterText: string;
}

export default function HighlightedText(props: IProp) {
    const { item, filterText } = props;

    const index = item.name.toLowerCase().indexOf(filterText.toLowerCase());
    const highlightedText = index !== -1 ? (
        <>
            {item.name.substring(0, index)}
            <span className="highlighted-text">{item.name.substring(index, index + filterText.length)}</span>
            {item.name.substring(index + filterText.length)}
        </>
    ) : item.name;

    return highlightedText
}
