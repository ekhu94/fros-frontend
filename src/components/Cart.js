import React, { useState, useEffect } from 'react'
import Checkout from './Checkout'
import * as cookie from '../services/cookies'

import { Grid, Image, Button } from 'semantic-ui-react'

export default function Cart({allCloths, user}) {

    const [itemObj, setItemObj] = useState({...cookie.getCartCookie()})
    const [itemsInCart, setItemInCart] = useState([])
    const [total, setTotal] = useState(0.00)
    const itemIDs = Object.keys(itemObj)

    //TODO use this boolean to begin checkout process...maybe
    const [checkout, setCheckout] = useState(false);

    useEffect(() => {
        const items = [];
        allCloths.map(item => itemIDs.map(id=> item.id==id && items.push(item)));
        setItemInCart(items);
        return () => {
        }
    }, [itemObj, allCloths])

    useEffect(() => {
        const newTotal = itemsInCart.map(item => itemObj[item.id]*item.price).reduce((a,b)=>a+b, 0).toFixed(2);
        setTotal(newTotal);
        cookie.setCartCookie(itemObj)
        return () => {
        };
    }, [itemsInCart, itemObj])

    const handleQuantity = (e, item) =>{
        if(e.target.innerText==='-'){
            console.log('hello')
            setItemObj({...itemObj,[item.id]:itemObj[item.id]-1})
        } else if (e.target.innerText==='+'){
            setItemObj({...itemObj,[item.id]:itemObj[item.id]+1})
        }
    }

    const removeHandle = item =>{
        let updateObj = {...itemObj}
        delete updateObj[item.id]
        setItemObj(updateObj)
    }

    const onCheckoutClick = () => {
        if (parseFloat(total) > 0) {
            setCheckout(true);
        } else {
            window.history.pushState({}, '', '/show');
            window.location.reload();
        }
    }

    const renderRow = item =>{
        return(
            <Grid.Row key={item.id}>
                <Grid.Column>
                    <Image src={item.front_URL} />
                </Grid.Column>
                <Grid.Column>
                    <p>{item.name}</p>
                </Grid.Column>
                <Grid.Column>
                    <p>{item.price}</p>
                </Grid.Column>
                <Grid.Column>
                    {itemObj[item.id]<=1 ?
                    <Button disabled>
                        -
                    </Button> :
                    <Button 
                        onClick={(e)=>handleQuantity(e, item)}
                    >
                        -
                    </Button>}
                    <p>{itemObj[item.id]}</p>
                    <Button onClick={(e)=>handleQuantity(e, item)}>
                        +
                    </Button>
                </Grid.Column>
                <Grid.Column>
                    <Button onClick={()=>removeHandle(item)}>
                        Remove
                    </Button>
                </Grid.Column>
            </Grid.Row>
        )
    }

    return (
        <div className='ui container'>
            <Grid relaxed>
                {itemsInCart.map(item=> renderRow(item))}
                <Grid.Row>
                    <Grid.Column >
                        <h1>Total: ${total}</h1>
                        <Button secondary onClick={onCheckoutClick}>
                            { parseFloat(total) > 0 ? 'Checkout' : 'Keep Shopping' }
                        </Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            { checkout && user ? <Checkout itemObj={itemObj} itemsInCart={itemsInCart} total={total} user={user} /> : null }
        </div>
    )
}
