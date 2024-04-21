import React from 'react'
import styled from 'styled-components'
import IProduct from '../../../types/products.interfaces'
import StatusElement from '../../atoms/Status/StatusElement'
import colors from '../../../typography/colors'
interface IProductOverviewSection {
    products?: IProduct[]
}

const StyledH3 = styled.h3`
    padding-left: 20px;
`
// Styled components for the product overview section
const ProductSectionContainer = styled.div`
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
`

const ProductDetail = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 10px;
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
const Line = styled.div`
    background: ${colors.primaryBlue};
    height: 1px;
    width: 100%;
    max-width: 500px;
`
// Component to display product overview section
const ProductOverviewSection: React.FC<IProductOverviewSection> = ({ products }) => {
    return (
        <>
            <StyledH3>Proizvodi:</StyledH3>
            {products?.map((item, index) => (
                <ProductSectionContainer key={index}>
                    <ProductDetail>
                        <DetailLabel>Naziv:</DetailLabel>
                        <DetailValue>{item.naziv}</DetailValue>
                    </ProductDetail>
                    <ProductDetail>
                        <DetailLabel>Dobavljač:</DetailLabel>
                        <DetailValue>{item.dobavljač}</DetailValue>
                    </ProductDetail>
                    <ProductDetail>
                        <DetailLabel>Status:</DetailLabel>
                        <WrapperStatus>
                            <StatusElement status={item?.status} />
                        </WrapperStatus>
                    </ProductDetail>
                    <Line />
                </ProductSectionContainer>
            ))}
        </>
    )
}

export default ProductOverviewSection
