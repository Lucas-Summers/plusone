"use client"
import React, { useState, useEffect } from 'react';

interface ListingContainerProps {
  cards: React.ReactNode[];  // cards is an array of Card objects
}

const ListingContainer: React.FC<ListingContainerProps> = (props) => {
  const { cards } = props
  const [cardsPerPage, setCardsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  // Handler for next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handler for previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const updateCardsPerPage = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1280) {
      setCardsPerPage(20) // 5 columns on xtra large screens
    } else if (screenWidth >= 1024) {
      setCardsPerPage(16); // 4 columns on large screens
    } else if (screenWidth >= 768) {
      setCardsPerPage(12); // 3 columns on medium screens
    } else if (screenWidth >= 640) {
      setCardsPerPage(8);  // 2 columns on small screens
    } else {
      setCardsPerPage(4);  // 1 column on smaller screens
    }
  };

  useEffect(() => {
    updateCardsPerPage(); // Initial setting based on current screen width
    window.addEventListener('resize', updateCardsPerPage); // Update on resize

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', updateCardsPerPage);
    };
  }, []);

  return (
    <div className='flex flex-col flex-1 min-h-screen w-full items-center justify-center'>
      <div className='grid gap-4 p-4 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {currentCards.map((Card, index) => (
            <div key={index} className='flex flex-col'>
              {Card}
            </div>
          ))}
      </div>

      <div className='flex-1'></div>
      <div className="flex justify-center items-center m-10">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Prev
        </button>
        <span className="text-lg px-5 sm:px-8">Page {currentPage} of {totalPages}</span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListingContainer;