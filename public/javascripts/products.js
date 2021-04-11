
document.addEventListener("DOMContentLoaded", async () => {
    let offset = document.querySelectorAll('.product-listing').length;
    const load10More = document.querySelector('#load-10-more')
    if (load10More) {
        load10More.addEventListener('click', async (e) => {
            const limitData = document.querySelector('#count')
            const limit = parseInt(limitData.value)
            console.log(limit)
            e.preventDefault();
            let newProductsData = await fetch(`http://diy-product-hunt.herokuapp.com/products/load`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ offset, limit })
            })
            const newProducts = await newProductsData.json()
            const productList = document.querySelector('.product-list')
            newProducts.products.forEach((product) => {
                let timestamp = Date.parse(product.createdAt)
                let date = new Date(timestamp)
                const productDiv = `<div class="product-listing"><div class="product-listing__left">
    <div class="product-listing__image">
        <div><a href="/products/${product.id}"><img class="product-image" src="${product.photoURL}"></a></div>
    </div>
    <div class="product-listing__info">
        <div class="product-info">
            <div class="product-info__name"><span>${product.name}</span></div>
            <div class="product-info__creator"><span>Created By:<a href="/users/${product.userId}"> ${product.User.firstName} ${product.User.lastName}</a></span></div>
        </div>
        <div>
            <div class="product-info__summary"><span>${product.summary}</span></div>
        </div>
    </div>
</div>
<div class="product-listing__right">
    <div class="product-listing__buttons"><a href="/products/${product.id}">
            <button>Details Page</button></a></div>
    <div class="product-listing__createdAt"><span>Launched: ${date.toLocaleDateString(undefined)}</span></div>
</div></div>`;
                productList.insertAdjacentHTML('beforeend', productDiv)
            });
            offset += newProducts.products.length
        })
    }
})