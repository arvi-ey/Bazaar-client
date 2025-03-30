import React from 'react'

const OrderBox = ({ data }) => {
    //     {
    //   "_id": "67e950f31b2efcaed6e19b62",
    //   "productId": "6739f02851c69411aa42ddd6",
    //   "userId": "67c301006fa8c011473aa584",
    //   "totalPrice": 2999,
    //   "quantity": 1,
    //   "deliveryTime": 3,
    //   "size": "XS",
    //   "image": "https://www.snitch.co.in/cdn/shop/files/9f22aab4a0528351b39745b5d41b1aba.jpg?v=1728373256&width=1800",
    //   "productTitle": "Light Blue Plain Baggy Fit Jeans",
    //   "paymentMode": "CARD",
    //   "paymentStatus": "PAID",
    //   "orderDate": "2025-03-30T14:10:38.415Z",
    //   "orderAddress": "Angless nagar",
    //   "city": "Kolkata",
    //   "state": "West Bengal",
    //   "houseNumber": "90",
    //   "pinCode": 700114,
    //   "addressType": "OFFICE",
    //   "orderStatus": "PLACED",
    //   "createdAt": "2025-03-30T14:10:59.575Z",
    //   "updatedAt": "2025-03-30T14:10:59.575Z",
    //   "__v": 0
    // }

    function formatFriendlyDate(date) {
        const d = new Date(date);

        const day = d.getDate();
        const suffix =
            (day % 10 === 1 && day !== 11) ? 'st' :
                (day % 10 === 2 && day !== 12) ? 'nd' :
                    (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

        const month = d.toLocaleString('default', { month: 'short' });

        const weekday = d.toLocaleString('default', { weekday: 'long' });
        let hour = d.getHours();
        const ampm = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;

        return `${day}${suffix} ${month}, ${weekday} at ${hour} ${ampm}`;
    }

    const GetDeliveryDate = (days) => {
        if (!days) return
        const today = new Date();
        today.setDate(today.getDate() + days);
        const options = {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        };
        return today.toLocaleDateString('en-US', options);
    }
    return (
        <div className='OrderBoxContainer' >
            <div className='orderProductImage' >
                <img src={data?.image} alt='Order-Product' className='OrderProduct' />
            </div>
            <div className='orderProductDesc' >
                <p className='orderProductTitle' >{data?.productTitle}</p>
                <p className='orderProductPrice'>₹ {Math.floor(data?.totalPrice)}</p>
                <p className='orderProductAddress'>{`${data?.state}, ${data?.orderAddress}, ${data?.city}, pin code:${data?.pinCode}, ${data?.houseNumber && `House no.${data.houseNumber}`}`}</p>
                <p className='orderProductDate'>Order placed on {formatFriendlyDate(data?.orderDate)}</p>
                <p className='orderProducPayment'>Payment Status: <span className='paymentStatusText' >{data?.paymentStatus}</span> </p>
                <p className='orderProducStatus'>Order Status: <span className='orderStatusText' >{data?.orderStatus}</span> </p>
                <p className='orderExpecedDelivery'>Delivery expected by : {GetDeliveryDate(data?.deliveryTime)}</p>

            </div>
        </div>
    )
}

export default OrderBox