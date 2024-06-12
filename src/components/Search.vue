<template>
  <div class="container">
    <div class="search">
      <div class="search__header">
        <h1 class="title">Search Books</h1>
        <button @click="handleLogout" class="logout-button">Log out</button>
      </div>
      <div class="search__input-wrapper">
        <input class="search__input" v-model="query" @input="searchBooks" @keydown.backspace="clearIfEmpty" placeholder="Search for books" />
        <img v-if="query" @click="clearResults" class="search__clear" src="../assets/svg/close.svg" alt="">
      </div>
      <table v-if="!searching && books?.length">
        <thead>
        <tr>
          <th>Thumbnail</th>
          <th>Title</th>
          <th>Author</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="book in books" :key="book.id" @click="viewDetails(book.id)">
          <td><img :src="book.volumeInfo.imageLinks?.thumbnail" alt="Thumbnail" /></td>
          <td>{{ book.volumeInfo.title }}</td>
          <td>{{ book.volumeInfo.authors?.join(', ') }}</td>
        </tr>
        </tbody>
      </table>
      <NoData v-if="searched && !searching && !books?.length" />
      <p v-if="searching" class="search__searching">Searching....</p>
    </div>
  </div>
</template>

<script setup>
import axios from "../services/axios.js";
import {onMounted, ref, watch} from "vue";
import router from "../router/index.js";
import NoData from "./NoData.vue";



const query = ref("");
const books = ref([]);
const searching = ref(false);
const searched = ref(false)

onMounted(() => {
  const savedQuery = localStorage.getItem('lastQuery');
  if (savedQuery) {
    query.value = savedQuery;
    searchBooks();
  }
});

const searchBooks = async () => {
  searching.value = true;
  searched.value = query.value.length > 2;
  if (searched.value) {
    const response = await axios.get(`?q=${query.value}`);
    books.value = response?.data?.items ?? response?.data;
    localStorage.setItem('lastQuery', query.value);
  } else {
    books.value = [];
  }

  searching.value = false
};

function viewDetails(bookId) {
  router.push({ name: 'details', params: { bookId } });
}

const clearResults = () => {
  query.value = "";
  books.value = [];
  searched.value = false;
  localStorage.clear()
};


const clearIfEmpty = (event) => {
  if ((event.key === 'Delete' || event.key === 'Backspace') && !query.value.trim()) {
    clearResults();
  }
};

watch(query, (newVal) => {
  if (!newVal.trim()) {
    clearResults();
  }
});

const handleLogout = () => {
  localStorage.removeItem("authToken")
  router.push('/')
}

</script>

<style scoped>

.search__header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logout-button {
    padding: 8px 16px;
    box-shadow: inset 0 0 0 1px #8595AD;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 700;
    background-color: transparent;
    transition: all 0.3s;
    border: none 0;

    &:hover {
      cursor: pointer;
      background-color: var(--bg-color);
      color: #ffffff;
      box-shadow: none;
    }
  }
}
/* Style the table */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 1em;
  font-family: Arial, sans-serif;
  min-width: 400px;
  border: 1px solid #dddddd;
}

/* Style the table header */
thead tr {
  background-color: #f2f2f2;
  text-align: left;
  font-weight: bold;
}

/* Style table cells */
th, td {
  padding: 12px 15px;
  border: 1px solid #dddddd;
  text-align: left;
}

/* Zebra stripe for table rows */
tbody tr:nth-of-type(even) {
  background-color: #f9f9f9;
}

/* Add some hover effect */
tbody tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}
.search {
  background-color: var(--bg-white);
  padding: 32px;
  border-radius: 4px;

  h1.title {
    margin-bottom: 32px;
  }

  .search__input {
    padding: 16px;
    width: 100%;
    margin-bottom: 12px;
    border-radius: 4px;
    border: 1px solid var(--stroke-primary);

    &::placeholder {
      color: var(--text-secondary);
      font-size: 14px;
    }
  }
}

.search__input-wrapper {
  position: relative;

  .search__clear {
    position: absolute;
    top: 25%;
    right: 16px;

    &:hover {
      cursor: pointer;
    }
  }
}

.search__searching {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
