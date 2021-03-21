import { act } from '@testing-library/react';
import { connectToDatabase } from '../../lib/mongodb';
import "@testing-library/jest-dom"

describe("#connectToDatabase", () => {
    it("returns a database connection", async () => {
        const promise = Promise.resolve();

        expect(await connectToDatabase()).toBeInstanceOf(Object);

        await act(() => promise);
    });
});