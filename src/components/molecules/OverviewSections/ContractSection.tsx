import IContract from '../../../types/contract.types'
import StatusElement from '../../atoms/Status/StatusElement'
import styled, { css } from 'styled-components'
import colors from '../../../typography/colors'
import convertToCroatianDateFormat from '../../../utilities/ConvertToCroatianDate'
import React, { useState } from 'react'
import Button from '../../atoms/Button/Button'
import Status from '../../../constants/status'
import EditContractValues from '../../organisams/Forms/UpdateContractValues'

interface IContractSection {
    contract?: IContract
}
const StyleH2 = styled.h2`
    padding-left: 20px;
`
const ContractDetailContainer = styled.div`
    display: flex;
    padding: 20px;
    border-radius: 10px;
    gap: 20px;
`

// Styled components for detail items
const DetailItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const DetailLabel = styled.p`
    font-weight: bold;
    margin: 0;
`

const DetailValue = styled.p`
    margin: 0;
`
const WrapperStatus = styled.div`
    p {
        margin: 0;
    }
`
const Line = styled.div<{ $isNeedMoreWidth?: boolean }>`
    background: ${colors.primaryBlue};
    height: 1px;
    width: 100%;
    max-width: 750px;
    margin-left: 20px;
    ${(props) =>
        props.$isNeedMoreWidth &&
        css`
            max-width: 1100px;
        `}
`

const ContractSection = ({ contract }: IContractSection) => {
    const [isEditEnabled, setIsEditEnabled] = useState(false)

    // This is for preventing showing and executing any other code
    // if contract data is not available
    if (contract === undefined) return null

    return (
        <>
            <StyleH2>DETALJI O UGOVORU</StyleH2>
            <ContractDetailContainer>
                <DetailItem>
                    <DetailLabel>Kupac:</DetailLabel>
                    <DetailValue>{contract?.kupac}</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>Broj ugovora:</DetailLabel>
                    <DetailValue>{contract?.broj_ugovora}</DetailValue>
                </DetailItem>
                <DetailItem>
                    <DetailLabel>Datum akontacije:</DetailLabel>
                    <DetailValue>{convertToCroatianDateFormat(contract?.datum_akontacije)}</DetailValue>
                </DetailItem>
                {isEditEnabled ? (
                    <EditContractValues
                        contract={contract}
                        cancelEditing={(cancel) => {
                            setIsEditEnabled(!cancel)
                        }}
                    />
                ) : (
                    <>
                        <DetailItem>
                            <DetailLabel>Rok isporuke:</DetailLabel>
                            <DetailValue>{convertToCroatianDateFormat(contract?.rok_isporuke)}</DetailValue>
                        </DetailItem>
                        <DetailItem>
                            <DetailLabel>Status:</DetailLabel>
                            <WrapperStatus>
                                <StatusElement status={contract?.status} />
                            </WrapperStatus>
                        </DetailItem>
                        {contract.status !== Status.delivered && (
                            <DetailItem>
                                <Button label={'Uredi ugovor'} onClick={() => setIsEditEnabled(true)} />
                            </DetailItem>
                        )}
                    </>
                )}
            </ContractDetailContainer>
            <Line $isNeedMoreWidth={contract.status !== Status.delivered} />
        </>
    )
}

export default ContractSection
