import React from 'react';

function createPage(){

    return(
        <div>
            <form>
                <label>
                    Page Type:
                    <select>
                        <option>hello</option>
                        <option>hello</option>
                        <option>hello</option>
                    </select>
                </label>
            </form>

            <button>
                Preview Page
            </button>

            <form>
                <label>
                    Title
                </label>
            </form>

            <form>
                <label>
                    Content
                    <textarea value="50"/>
                    
                </label>
            </form>
        </div>
    );
}

export default createPage;