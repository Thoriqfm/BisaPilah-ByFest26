import { forwardRef } from 'react';
import { WasteItem } from '../../data/wasteTypes';

interface TrashItemProps {
    item: WasteItem;
}

const TrashItem = forwardRef<HTMLDivElement, TrashItemProps>(({ item }, ref) => {
    return (
        <div 
            ref={ref}
            className="group relative flex flex-col items-center justify-center cursor-grab touch-none z-10"
        >
            {/* Tooltip / Pop-up */}
            <div className="absolute -top-14 sm:-top-16 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none w-max">
                <div className="bg-[#f0f7f4] border-[3px] border-green-700 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl rounded-bl-sm px-4 py-2 shadow-sm">
                    <p className="text-green-700 font-bold text-sm sm:text-base whitespace-nowrap">{item.tooltip}</p>
                </div>
            </div>

            <img 
                src={item.image} 
                alt={item.name} 
                className="w-20 sm:w-24 h-auto drop-shadow-md pointer-events-none mt-4"
                draggable={false}
            />
        </div>
    );
});

TrashItem.displayName = 'TrashItem';
export default TrashItem;
