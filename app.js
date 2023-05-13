const NUMBERS_URL = 'http://numbersapi.com/';

const CARDS_URL = 'https://deckofcardsapi.com/api/deck/';

function get_number_request(...num)
{
    //const res = axios.get(`${NUMBERS_URL}${get_ranges_for_numbers(num)}`);
    return axios.get(`${NUMBERS_URL}${get_ranges_for_numbers(num)}?json`).then((res) => show_batch_number_request(res));
}

function get_number_requests(num, amt)
{
    //const res = axios.get(`${NUMBERS_URL}${get_ranges_for_numbers(num)}`);
    for(let i = 0; i < amt; i++) { axios.get(`${NUMBERS_URL}${num}?json`).then((res) => show_number_request(res)); }
}

function show_number_request(res)
{
    let listItem = document.createElement('li');
    listItem.innerText = res.data.text;
    $('#number_3').append(listItem);
}

function show_batch_number_request(res)
{
    for(fact in res.data)
    {
        let listItem = document.createElement('li');
        listItem.innerText = res.data[fact];
        $('#batch').append(listItem);
    }
    return res;
}

function get_ranges_for_numbers(nums = [])
{
        let sorted_nums = nums.sort();
        if(sorted_nums.length == 1)
            return sorted_nums[0];
        
        let string_ranges = '';
        let current_start_range = sorted_nums[0];
        for(let i = 1; i < sorted_nums.length; i++)
        {
            if(sorted_nums[i] != sorted_nums[i-1]+1)
            {
                if(string_ranges.length != 0)
                    string_ranges +=','
                string_ranges += `${current_start_range}..${sorted_nums[i-1]}`
                current_start_range = sorted_nums[i];

                
            }
            if(i == sorted_nums.length-1)
            {
                if(string_ranges.length != 0)
                    string_ranges +=','
                string_ranges += `${current_start_range}..${sorted_nums[i]}`
            }
        }
        return string_ranges;
}

get_number_request(1,2,3,6,10,11,12,17,32,100,43,57);

get_number_requests(3, 4);




let LAST_DECK_ID = '';

//______________________________________________
function get_card_request(count, id='')
{
    if(id == '')
        return axios.get(`${CARDS_URL}new/draw/?count=${count}`).then((res) => show_cards_shuffled(res));
    else
        return axios.get(`${CARDS_URL}${id}/draw/?count=${count}`).then((res) => show_cards_shuffled(res));
}

function show_cards_shuffled(res)
{
    console.log(res);
    LAST_DECK_ID = res.data.deck_id;
    for(n in res.data.cards)
        show_card(res.data.cards[n]);
}

function show_card(card)
{
    let listItem = document.createElement('li');
    listItem.innerText = `${card.value} of ${card.suit}`;
    $('#cards').append(listItem);
}

get_card_request(2, '');

get_card_request(1, '');

get_card_request(2, LAST_DECK_ID);