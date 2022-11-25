import React from 'react'

function Test() {
    return (
        <div>
            <div class="p-[60px] bg-slate-50">
                <div class="flex items-center justify-center">
                    <div class="container">
                        <div class="mt-8 grid grid-cols-2 gap-2 rounded-xl bg-white p-2 lg:grid-cols-4 w-full h-full">
                            <div class="group relative overflow-hidden rounded-xl">
                                <div class="absolute inset-0 h-full w-full group-hover:bg-rose-400/20"></div>

                                <img src="https://images.unsplash.com/photo-1664174274811-948eceef7047?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" class="h-auto w-full" alt="Nasi lemak cover" />
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Test