import IDataItem from '../interfaces/IDataItem';
import jsonData from './data.json'

const data = jsonData as IDataItem[];

const apiService = {
    getData: async (): Promise<IDataItem[]> => {
        return await new Promise(resolve => {
            setTimeout(() => {
                resolve(data);
            }, 500); // delay 0.5 second
        });
    },

    filterData: async (filterText: string): Promise<IDataItem[]> => {
        return await new Promise(resolve => {
            setTimeout(() => {
                const filteredData = data.filter(item =>
                    item.name.toLowerCase().includes(filterText.toLowerCase())
                );
                resolve(filteredData);
            }, 500); //  delay 0.5 seconds
        });

    }
};

export default apiService;