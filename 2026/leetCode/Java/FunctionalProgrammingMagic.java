import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class FunctionalProgrammingMagic {

    /**
     * This method generates the cubes of the first n natural numbers.
     * @param n The number of natural numbers for which cubes are to be calculated.
     * @return List<Integer> This returns a list of cubes of the first n natural numbers.
     */
    public static List<Integer> getCubesOfFirstNNumbers(int n) {
        return IntStream.rangeClosed(1, n)
                .map(i -> i * i * i)
                .boxed()
                .collect(Collectors.toList());
    }
}
