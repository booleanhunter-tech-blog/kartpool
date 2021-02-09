const driver = new Driver();

// Initialize data for tour
const dummyNearbyWishlists = [
  {
    "id": 999,
    "created_at": "2020-12-02T14:58:24.179317Z",
    "buyer": "raghu",
    "wishmaster": "",
    "items": [
      "eggs",
      "milk",
      "chocolate"
    ],
    "status": "PENDING",
    "store": "1372"
  }
];
renderWishlists("nearby-wishlists", dummyNearbyWishlists);
document.getElementsByClassName("wishlist")[0].style.visibility = "hidden";
// Define the steps for introduction


driver.defineSteps([
  {
    element: "#logo",
    popover: {
      className: "first-step-popover-class",
      title: "Welcome to Kartpool",
      description: "A community-driven delivery app for the ones that need it the most",
      position: "right"
    }
  },
  {
    element: document.getElementsByClassName("flex-item")[3],
    popover: {
      title: "Map of your neighborhood",
      description: "Use the input box to type in the name of your neighborhood" +
      " and view nearby stores" +
      "\n Type 'North Lincoln Avenue, Chicago, Illinois 60625, United States' and select the top result",
      position: "left"
    }
  },
  {
    element: "#map",
    popover: {
      title: "Store locations",
      description: "Click or hover over a store icon to view the store's name," +
      " address, distance, and other details",
      position: "left"
    },
    onNext: () => {
      // Prevent moving to the next step
      driver.preventMove();
      // click on the first tab
      document.getElementsByClassName("wishlist")[0].style.visibility = "visible";
      document.getElementById("tab1").checked = true;
      // move to next step
      driver.moveNext();
    }
  },
  {
    element: document.getElementsByTagName("section")[0],
    popover: {
      title: "Wishlists",
      description: "In this section, you'll find wishlists created by people" +
      " in your neighborhood. They are displayed in a column of cards",
      position: "right"
    },
  },
  {
    element: "#nearby-wishlists",
    popover: {
      title: "Nearby Wishlists",
      description: "The 1st Tab shows wishlists created by everyone in your neighborhood, including yourself.",
      position: "right"
    },
  },
  {
    element: document.getElementById("nearby-wishlists"),
    popover: {
      title: "Nearby Wishlists",
      description: "You can scroll through the list to view their statuses, choose to pick any of them" +
      " and be a wishmaster.",
      position: "right"
    },
  },
  {
    element: document.getElementsByClassName("wishlist")[0],
    popover: {
      title: "A Wishlist",
      description: "Here is a wishlist card. Let's look at what info it displays",
      position: "right"
    },
  },
  {
    element: document.getElementsByClassName("wishlist")[0].children[0].children[0],
    popover: {
      title: "Your neighbor",
      description: "This is the name of the user who created the wishlist." +
      " Hovering on the name shows the date when it was created.",
      position: "right"
    },
  },
  {
    element: document.getElementsByClassName("wishlist")[0].children[0].children[1],
    popover: {
      title: "Items to buy",
      description: "These are the list of items that the user needs",
      position: "right"
    },
  },
  {
    element: document.getElementsByClassName("wishlist")[0],
    popover: {
      title: "Where can I buy the items?",
      description: "Clicking on the card will also show the store location" +
      " where the items can be purchased from",
      position: "right"
    },
  },
  {
    element: document.getElementsByClassName("wishlist")[0].children[1],
    popover: {
      title: "How do I fulfill a wishlist for my neighbor?",
      description: "You can click on the little grey run icon to accept this wishlist" +
      " and make a trip to the store to purchase the items. \n\n" +
      "Wishlists already picked by you or anyone else will be marked by a green shopping icon, and" +
      "completed wishlists are marked by a green tick.",
      position: "right"
    },
    onNext: () => {
      // Prevent moving to the next step
      driver.preventMove();
      // click on the first tab
      document.getElementById("tab2").checked = true
      // move to next step
      driver.moveNext();
    }
  },
  {
    element: document.getElementById("tab2").labels[0],
    popover: {
      title: "My Requests",
      description: "Click on this tab to see wishlists created by you.",
      position: "right"
    },
  },
  {
    element: "#my-wishlists",
    popover: {
      title: "My Requests",
      description: "You'll can track the status of your wishlists here by refreshing the page.",
      position: "right"
    },
    onNext: () => {
      // Prevent moving to the next step
      driver.preventMove();
      // click on the first tab
      document.getElementById("tab3").checked = true
      // move to next step
      driver.moveNext();
    }
  },
  {
    element: document.getElementById("tab3").labels[0],
    popover: {
      title: "My Requests",
      description: "Click on this tab to view all wishlists that you accepted on behalf of other users.",
      position: "right"
    },
  },
  {
    element: "#my-trips",
    popover: {
      title: "My Trips",
      description: "Once you fulfil a wishlist, you can click on the green shopping icon to change the status to 'complete'.",
      position: "right"
    }
  },
  {
    element: "#wishlist-items",
    popover: {
      title: "Stuck at home and need help in buying stuff?",
      description: "To add a wishlist of your own, click on a store icon on the map and add" +
      " a list of items that you need separated by comma",
      position: "right"
    },
    onNext: () => {
      // Prevent moving to the next step
      driver.preventMove();
      // click on the first tab
      document.getElementById("tab2").checked = true
      // move to next step
      driver.moveNext();
    }
  },
  {
    element: "#my-wishlists",
    popover: {
      title: "My Requests",
      description: "Once you create a wishlist, it'll now appear under your requests," +
      " and will be visible to your neighbors in their NEARBY tab",
      position: "right"
    },
  },
]);

// Start the introduction
driver.start();