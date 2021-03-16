import React, { useContext, useEffect, useState } from 'react';
import '../../../Components/styles.scss';
import { LineHolder } from '../../../Components/LineHolder';
import { Line, lineColors, lineSides, lineSizes } from '../../../Components/Lines/Line';
import { RowHolder } from '../../../Components/RowHolder';
import { EmptyLine } from '../../../Components/Lines/EmptyLine';
import { lineSelectKeys } from '../../../Components/Buttons';
import { LabelField } from '../../../Components/Fields/NonInteractive/LabelField';
import { RootContext } from '../../../RootContext';
import { Content } from '../../../Components/Content';
import { Field } from '../../../Components/Fields/NonInteractive/Field';
import { LineSelectField } from '../../../Components/Fields/Interactive/LineSelectField';

type FMGCTextProps = {
    activeSys: string,
    setActiveSys: React.Dispatch<React.SetStateAction<string>>,
    setPage: React.Dispatch<React.SetStateAction<string>>,
    selected: string,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
}
const FMGCText: React.FC<FMGCTextProps> = ({ activeSys, setActiveSys, setPage, selected, setSelected }) => {
    function determineColor() {
        if (activeSys === 'FMGC') {
            if (selected === 'FMGC') {
                return lineColors.cyan;
            }
            return lineColors.green;
        }
        return lineColors.white;
    }

    function determineText() {
        if (activeSys === 'FMGC') {
            if (selected === 'FMGC') {
                return '<FMGC (SEL)';
            }
            return '<FMGC (REQ)';
        }
        return '<FMGC (REQ)';
    }

    return (
        <LineHolder>
            <EmptyLine />
            <Line
                side={lineSides.left}
                value={(
                    <LineSelectField
                        value={determineText()}
                        color={determineColor()}
                        lsk={lineSelectKeys.L1}
                        selectedCallback={(() => {
                            setActiveSys('FMGC'); // Placeholder until we can retrieve activeSys from FMGC
                            setSelected('FMGC');
                            setTimeout(() => {
                                if (setPage) {
                                    setPage('IDENT');
                                }
                            }, Math.floor(Math.random() * 400) + 400);
                        })}
                        size={lineSizes.regular}
                    />
                )}
            />
        </LineHolder>
    );
};

type TextProps = {
    system: string,
    activeSys: string,
    setActiveSys: React.Dispatch<React.SetStateAction<string>>,
    setPage?: React.Dispatch<React.SetStateAction<string>>,
    selected: string,
    side: lineSides,
    setSelected: React.Dispatch<React.SetStateAction<string>>,
    lsk: lineSelectKeys
}
const MenuLineText: React.FC<TextProps> = ({ lsk, side, system, activeSys, setActiveSys, selected, setSelected }) => {
    function determineColor() {
        if (activeSys === system) {
            if (selected === system) {
                return lineColors.cyan;
            }
            return lineColors.green;
        }
        return lineColors.white;
    }

    function determineText() {
        if (side) {
            if (activeSys === system) {
                if (selected === system) {
                    return side === lineSides.left ? `<${system} (SEL)` : `(SEL) ${system}>`;
                }
                return side === lineSides.left ? `<${system}` : `${system}>`;
            }
            return side === lineSides.left ? `<${system}` : `${system}>`;
        }
        return 'INSERT A SIDE';
    }

    return (
        <LineHolder>
            <EmptyLine />
            <Line
                side={lineSides.left}
                value={(
                    <LineSelectField
                        size={lineSizes.regular}
                        value={determineText()}
                        color={determineColor()}
                        lsk={lsk}
                        selectedCallback={(() => {
                            if (system) {
                                setActiveSys(system);
                                setSelected(system);
                            }
                        })}
                    />
                )}
            />
        </LineHolder>
    );
};

const NAVBText: React.FC = () => (
    <LineHolder>
        <Line side={lineSides.right} value={<LabelField value={'SELECT\xa0'} color={lineColors.white} />} />
        <Line side={lineSides.right} value={<Field value="NAV B/UP" color={lineColors.white} size={lineSizes.regular} />} />
    </LineHolder>
);

const OptionsText: React.FC = () => (
    <LineHolder>
        <EmptyLine />
        <Line
            side={lineSides.right}
            value={(
                <Field value="OPTIONS>" size={lineSizes.regular} color={lineColors.inop} />
            )}
        />
    </LineHolder>
);

const ReturnText: React.FC = () => (
    <LineHolder>
        <EmptyLine />
        <Line
            side={lineSides.right}
            value={(
                <Field
                    color={lineColors.inop}
                    size={lineSizes.regular}
                    value="RETURN>"
                />
            )}
        />
    </LineHolder>
);

type MenuProps = {
    setPage: React.Dispatch<React.SetStateAction<string>>
}
const MenuPage: React.FC<MenuProps> = ({ setPage }) => {
    const [activeSys, setActiveSys] = useState('FMGC'); // Placeholder till FMGS in place
    const [selected, setSelected] = useState('');
    const [, , , setTitle] = useContext(RootContext);

    useEffect(() => {
        setTitle('MCDU MENU');
    }, []);

    return (
        <>
            <Content>
                <RowHolder index={1}>
                    <FMGCText activeSys={activeSys} setActiveSys={setActiveSys} setPage={setPage} selected={selected} setSelected={setSelected} />
                    <NAVBText />
                </RowHolder>
                <RowHolder index={2}>
                    <MenuLineText
                        lsk={lineSelectKeys.L2}
                        system="ATSU"
                        side={lineSides.left}
                        activeSys={activeSys}
                        setActiveSys={setActiveSys}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </RowHolder>
                <RowHolder index={3}>
                    <MenuLineText
                        lsk={lineSelectKeys.L3}
                        system="AIDS"
                        side={lineSides.left}
                        activeSys={activeSys}
                        setActiveSys={setActiveSys}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </RowHolder>
                <RowHolder index={4}>
                    <MenuLineText
                        lsk={lineSelectKeys.L4}
                        system="CFDS"
                        side={lineSides.left}
                        activeSys={activeSys}
                        setActiveSys={setActiveSys}
                        selected={selected}
                        setSelected={setSelected}
                    />
                </RowHolder>
                <RowHolder index={5}>
                    <OptionsText />
                </RowHolder>
                <RowHolder index={6}>
                    <ReturnText />
                </RowHolder>
            </Content>
        </>
    );
};

export default MenuPage;