"use client";

import React from 'react'

import Link from 'next/link'

export default function PageHeader({ breadcrums, button, trash }) {
  console.log(button, "button");
  console.log(trash, "trash");

  return (
    <div className="flex justify-between align-middle">
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          {
            breadcrums.map(
              (breadcrum, index) => {
                return (
                  <li className="inline-flex items-center" key={index}>
                    <svg
                      style={{ display: index == 0 && 'none' }}
                      className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 6 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 9 4-4-4-4"
                      />
                    </svg>
                    <a href={breadcrum.url} className={`ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:hover:text-blue-900 
${index == breadcrums.length - 1 && 'text-blue-600'}    `}>
                      {breadcrum.label}
                    </a>
                  </li>
                )
              }
            )
          }

        </ol>
      </nav>
      <div>
        {
          trash?.link != undefined && trash?.link != ""
          &&
          <Link href={trash.link}>
            <button className=' bg-blue-500 rounded p-2 text-center me-2'>View Trash Bin</button>
          </Link>
        }

        {
          button?.url != undefined && button?.url != "" &&
          <Link href={button?.url}>
            <button className=' bg-blue-500 rounded p-2 text-center'> {button?.text}</button>
          </Link>
        }
      </div>
    </div>
  )
}
